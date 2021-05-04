import Head from "next/head"
import { useRouter } from "next/router"
import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"

function Pricing() {

    const { currentUser } = useAuth()
    const router = useRouter()

    const plans = ["free", "edu-elite", "busi-suite"]
    const features = {
        free: ["10000 Responses", "Dashboard to manage", "Export responses to excel"],
        edu: ["Unlimited Responses", "Unilimited Forms", "Charts and Analytics", "Templates and Designs", "Provide Certificates", "Export to various formats", "Timer option for forms", "Built-in Edu form support"],
        business: ["Unlimited Responses", "Charts and Analytics", "Marketing templates", "Export to various formats"]
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const chosenPlan = e.target.name
        
        if(plans.includes(chosenPlan))
            if(currentUser)
                if(chosenPlan === "free")
                    router.push(`/dashboard`)
                else
                    router.push(`/checkout?plan=${chosenPlan}`)
            else 
                if(chosenPlan === "free")
                    router.push(`/signup`)
                else
                    router.push(`/signup?plan=${chosenPlan}`)
        else
            router.reload()
    }

    useEffect(() => {
        router.prefetch('/checkout')
    }, [])

    return (
        <>
            <Head><title>Pricing — Pointform</title></Head>
            <div className="bg-gray-50 p-10 h-full w-screen">
                <div className="text-center mt-6">
                    <h1 className="text-bold text-4xl">Choose a right plan for you!</h1>
                    <div className="flex flex-wrap lg:flex-nowrap md:flex-nowrap justify-between w-full lg:w-3/4 mx-auto mt-12">
                        <div className="h-full lg:w-1/4 m-2 p-4 bg-white border-2 border-gray-200 rounded-lg">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-semibold text-gray-900 font-bold text-2xl mt-6">Free Plan</h1>
                                    <div className="w-11/12 mt-2 mb-6 mx-auto">
                                        <h4 className="text-gray-500 font-medium">All basic features to create interactive forms</h4>
                                    </div>
                                </div>
                                <ul className="list-none">
                                    {features.free.map(freePlanFeature => (
                                        <li className="flex justify-start my-4" key={freePlanFeature.substring(0, 10)}>
                                            <img className="mr-2" src="/images/features_tick.svg" alt="Free Plan Features" />
                                            <span className="block font-medium text-gray-700">{freePlanFeature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <h1 className="text-semibold text-gray-700 font-bold text-2xl my-6">$0 per month</h1>
                                </div>
                                <button
                                    type="button"
                                    name="free"
                                    onClick={handleSubmit}
                                    className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
                                >
                                    Signup for free
                                </button>
                            </div>
                        </div>
                        <div className="h-full lg:w-1/3 m-2 p-4 bg-white border-2 border-gray-200 rounded-lg">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-semibold text-gray-900 font-bold text-2xl mt-6">Edu Plan</h1>
                                    <div className="w-11/12 mt-2 mb-6 mx-auto">
                                        <h4 className="text-gray-500 font-medium">Crafted for Institutions and Universities</h4>
                                    </div>
                                </div>
                                <ul className="list-none">
                                    {features.edu.map(eduPlanFeature => (
                                        <li className="flex items-center justify-start my-4" key={eduPlanFeature.substring(0, 10)}>
                                            <img className="mr-2" src="/images/features_tick.svg" alt="Edu Plan Features" />
                                            <span className="block font-medium text-gray-700">{eduPlanFeature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <h1 className="text-semibold text-gray-700 font-bold text-2xl my-6">$20 per month</h1>
                                </div>
                                <button
                                    type="button"
                                    name="edu-elite"
                                    onClick={handleSubmit}
                                    className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <div className="h-full lg:w-1/4 m-2 p-4 bg-white border-2 border-gray-200 rounded-lg">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-semibold text-gray-900 font-bold text-2xl mt-6">Business Plan</h1>
                                    <div className="w-11/12 mt-2 mb-6 mx-auto">
                                        <h4 className="text-gray-500 font-medium">Premium forms with countless features</h4>
                                    </div>
                                </div>
                                <ul className="list-none">
                                    {features.business.map(businessPlanFeature => (
                                        <li className="flex items-center justify-start my-4" key={businessPlanFeature.substring(0, 10)}>
                                            <img className="mr-2" src="/images/features_tick.svg" alt="Business Plan Features" />
                                            <span className="block font-medium text-gray-700">{businessPlanFeature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <h1 className="text-semibold text-gray-700 font-bold text-2xl my-6">$33 per month</h1>
                                </div>
                                <button
                                    type="button"
                                    name="busi-suite"
                                    onClick={handleSubmit}
                                    className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pricing
