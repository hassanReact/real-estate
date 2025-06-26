"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DataDisplay({ data }: { data: any }) {
  const [isVisible, setIsVisible] = useState(false)

  if (!data || !isVisible) {
    return (
      <div className="flex justify-center mt-4">
        <Button onClick={() => setIsVisible(true)}>Show Submitted Data</Button>
      </div>
    )
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Submitted Form Data</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
