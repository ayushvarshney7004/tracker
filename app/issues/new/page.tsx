import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authoptions";
import { redirect } from "next/navigation";

const IssueForm = dynamic(
  () => import('@/app/issues/_component/issueform'),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

const NewIssuePage = async () => {
  const session = await getServerSession(authOptions)
  if(!session) return redirect("/")
  return (
    <IssueForm />
  )
}

export default NewIssuePage