import PlanConteiner from '@/components/pageComponent/PlanConteiner';
import React from 'react';
interface Props {
    searchParams: Promise<{
        search?: string;
        priority?: string;
        sort?: string;
    }>;
}
const PlansPage = async ({ searchParams }: Props) => {
    const params = await searchParams;

    const search = params.search || "";
    const priority = params.priority || "";
    const sort = params.sort || "";

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/plans?search=${search}&priority=${priority}&sort=${sort}`,
        {
            cache: "no-store",
        }
    );

    const plans = await res.json();
    return (
        <PlanConteiner plans={plans}/>
    );
};

export default PlansPage;