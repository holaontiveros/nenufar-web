import {redirect} from 'react-router';
import type {Route} from './+types/catalogo';

export function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);

  throw redirect(`/collections/all${url.search}`, 301);
}
