import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["Up to 3 projects", "Basic AI assistance", "Community support", "1GB storage", "Standard templates"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      description: "Everything you need to scale",
      features: [
        "Unlimited projects",
        "Advanced AI models",
        "Priority support",
        "100GB storage",
        "Premium templates",
        "Custom integrations",
        "Analytics dashboard",
        "Team collaboration",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
    },
  ]

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered development with our flexible pricing options
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/70 ${
                plan.popular ? "ring-2 ring-teal-400/50 shadow-lg shadow-teal-400/10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-slate-400 ml-1">/month</span>}
                </div>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-400/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-teal-400" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-slate-900 shadow-lg shadow-teal-400/25"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-4">Need something custom? We've got you covered.</p>
          <Button variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  )
}
