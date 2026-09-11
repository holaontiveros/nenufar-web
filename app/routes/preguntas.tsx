import {useLoaderData} from 'react-router';
import type {Route} from './+types/preguntas';
import {FaqGroups, type FaqGroup} from '~/components/NenufarStory';

export const meta: Route.MetaFunction = () => [
  {title: 'Preguntas frecuentes | Nenúfar'},
];

type FaqNode = {
  question?: {value?: string} | null;
  answer?: {value?: string} | null;
  group?: {
    reference?: {
      id?: string;
      title?: {value?: string} | null;
      description?: {value?: string} | null;
      position?: {value?: string} | null;
    } | null;
  } | null;
};

type SortableFaqGroup = FaqGroup & {position: number};

function formatFaqGroups(faqs: FaqNode[]): FaqGroup[] {
  const groups = new Map<string, SortableFaqGroup>();

  faqs.forEach((faq) => {
    const question = faq.question?.value;
    const answer = faq.answer?.value;
    if (!question || !answer) return;

    const reference = faq.group?.reference;
    const id = reference?.id ?? 'ungrouped';
    const title = reference?.title?.value?.trim() || 'Preguntas frecuentes';
    const position = Number(reference?.position?.value);
    const group = groups.get(id) ?? {
      id,
      title,
      description: reference?.description?.value?.trim() || undefined,
      position: Number.isFinite(position) ? position : Number.MAX_SAFE_INTEGER,
      faqs: [],
    };

    group.faqs.push({question, answer});
    groups.set(id, group);
  });

  return [...groups.values()].sort(
    (left, right) =>
      left.position - right.position || left.title.localeCompare(right.title, 'es'),
  );
}

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;
  const {legacyFaqs, productionFaqs} = await storefront.query(FAQ_QUERY, {
    cache: storefront.CacheLong(),
  });

  return {
    faqGroups: formatFaqGroups([
      ...((legacyFaqs.nodes ?? []) as FaqNode[]),
      ...((productionFaqs.nodes ?? []) as FaqNode[]),
    ]),
  };
}

export default function FaqPage() {
  const {faqGroups} = useLoaderData<typeof loader>();

  return (
    <section className="story-section story-section--tint faq-page">
      <div className="nenufar-shell faq">
        <header className="story-heading">
          <span>Claridad &amp; procesos</span>
          <h1>Preguntas frecuentes</h1>
          <p>Todo lo que necesitas saber antes de ordenar.</p>
        </header>
        <FaqGroups faqGroups={faqGroups} />
      </div>
    </section>
  );
}

const FAQ_QUERY = `#graphql
  query FaqPage {
    legacyFaqs: metaobjects(type: "faq_item", first: 20) {
      nodes {
        question: field(key: "question") { value }
        answer: field(key: "answer") { value }
        group: field(key: "group") {
          reference {
            ... on Metaobject {
              id
              title: field(key: "title") { value }
              description: field(key: "description") { value }
              position: field(key: "position") { value }
            }
          }
        }
      }
    }
    productionFaqs: metaobjects(type: "nenufar_faq_item", first: 20) {
      nodes {
        question: field(key: "question") { value }
        answer: field(key: "answer") { value }
        group: field(key: "group") {
          reference {
            ... on Metaobject {
              id
              title: field(key: "title") { value }
              description: field(key: "description") { value }
              position: field(key: "position") { value }
            }
          }
        }
      }
    }
  }
` as const;
