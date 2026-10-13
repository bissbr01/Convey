// Turbopack omits pages/_document when pages/ has no routable file, then
// prerender still loads that module for /404. This route keeps the shell building.
export default function NotFoundPage() {
  return <p>This page could not be found.</p>;
}
