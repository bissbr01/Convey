import HomeClient from '../components/HomeClient';
import { loadFirstPage } from '../lib/keywordPage';

const DEFAULT_KEYWORD = 'college';

export default async function Page(props: PageProps<'/'>) {
  const sp = await props.searchParams;
  const raw = sp.q;
  const keyword =
    typeof raw === 'string' && raw.trim() !== '' ? raw : DEFAULT_KEYWORD;
  const firstPage = await loadFirstPage(keyword);
  return <HomeClient keyword={keyword} firstPage={firstPage} />;
}
