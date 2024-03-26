import { Inter } from "next/font/google";
import Questions from "@/features/question/Questions";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <AppLayout>
      <main className="flex justify-center flex-col items-center mt-16">
        <Questions />
      </main>
    </AppLayout>
  );
}
