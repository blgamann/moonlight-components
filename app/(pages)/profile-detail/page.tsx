import Profile from "@/app/(components)/profile/page";
import AnswerListPage from "@/app/(components)/answer/list/page";
import ResonanceListPage from "@/app/(components)/resonance/list/page";
import BookshelfComponent from "@/app/(components)/garden/bookshelf/page";

export default function ProfileDetailPage() {
  return (
    <div>
      <Profile />
      <AnswerListPage />
      <BookshelfComponent />
      <ResonanceListPage />
    </div>
  );
}
