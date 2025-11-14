import Layout from "@/components/Layout";
import { useGetAccountStatement } from "@/hooks/student/useGetAccountStatement";
import AccountStatementDetail from "@/components/students/AccountStatementDetail";
import { Skeleton } from "@/components/ui/skeleton"; 

export default function AccountStatementPage() {
    const { statement, loading, error } = useGetAccountStatement();

    return (
        <Layout>
            {loading && (
                <div className="p-6 max-w-4xl mx-auto space-y-8">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {statement && <AccountStatementDetail data={statement} />}
        </Layout>
    );
}