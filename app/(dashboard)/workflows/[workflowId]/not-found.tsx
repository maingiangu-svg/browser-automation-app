import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">Workflow not found</h2>
      <p className="text-muted-foreground">
        The workflow you&apos;re looking for doesn&apos;t exist or may have been deleted.
      </p>
      <Button asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
}