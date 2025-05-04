import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
  
export default function ArticleCard() {
    return (
        <Card className="w-full min-w-[380px] max-w-[400px] h-fit border-white">
        <CardContent className="p-0">
            <img
            src="/image.jpg"
            alt="Article cover"
            className="h-[240px] w-full object-cover rounded-t-xl"
            />
        </CardContent>

        <CardHeader>
            <p className="text-sm text-muted-foreground">April 13, 2025</p>
            <CardTitle className="text-lg">Cybersecurity Essentials Every Developer Should Know</CardTitle>
            <CardDescription>
            Protect your apps and users with these fundamental cybersecurity practices for developers.
            </CardDescription>
        </CardHeader>

        <CardFooter>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            Technology
            </span>
        </CardFooter>
        </Card>
    )
}