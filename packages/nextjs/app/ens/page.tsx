import { EnsResolver } from "./components/EnsResolver";

export default function EnsPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            ENS Resolver
          </h1>
          <p className="mt-3 text-lg text-base-content/70">
            Look up an Ethereum Name Service (ENS) name to find its address, or
            an address to find its ENS name.
          </p>
        </div>
        <EnsResolver />
      </div>
    </main>
  );
}
