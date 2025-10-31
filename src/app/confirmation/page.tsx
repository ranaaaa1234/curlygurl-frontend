import { Package } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main>
      <div className="mt-10 flex justify-center">
        <div className="p-4 text-center sm:border rounded bg-purple-50">
          <h1 className="text-purple-900 xs:text-2xl md:text-3xl font-semibold">
            Order placed successfully!
          </h1>
          <p className="mt-4 text-purple-900">
            Thank you for your purchase. We are processing your order.
          </p>
          <p className="mt-1 flex gap-1 items-center justify-center text-purple-900">
            <Package className="w-5 h-5 text-purple-400" />
            Delivery 2-5 days
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-5 gap-3">
        <Link href="/">
          <h1 className="text-xl underline font-semibold text-purple-400 cursor-pointer hover:text-purple-900">
            Curly Gurl
          </h1>
        </Link>
      </div>
    </main>
  );
}
