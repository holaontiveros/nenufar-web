import {data} from 'react-router';
import type {Route} from './+types/$';
import {NotFoundPage} from '~/components/NotFoundPage';

export const meta: Route.MetaFunction = () => [
  {title: 'Página no encontrada | Nenúfar'},
];

export async function loader() {
  return data(null, {status: 404});
}

export default function CatchAllPage() {
  return <NotFoundPage />;
}
