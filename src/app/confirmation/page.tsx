import { Package } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <main>
      <div className="mt-10 flex justify-center">
        <div className="p-4 text-center border rounded bg-purple-50">
          <h1 className="text-purple-400 text-3xl font-semibold">
            Order placed successfully!
          </h1>
          <p className="mt-4 text-purple-900">
            Thank you for your purchase. We are processing your order and will
            update you shortly.
          </p>
          <p className="mt-1 flex gap-1 items-center justify-center text-purple-900">
            <Package className="w-5 h-5 text-purple-400" />
            Delivery 2-5 days
          </p>
        </div>
      </div>
    </main>
  );
}
