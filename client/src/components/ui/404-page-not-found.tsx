import { NotFoundGlitch } from "./be-ui-404-not-found";

export function NotFoundPage() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center">
      <NotFoundGlitch />
    </div>
  );
}

export function PageNotFoundDemo() {
  return (
    <div className="w-full">
      <NotFoundPage />
    </div>
  );
}
