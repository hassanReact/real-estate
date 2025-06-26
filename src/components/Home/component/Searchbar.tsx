import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components from ShadCN

export function Searchbar() {
  return (
    <Tabs defaultValue="BUY" className="w-full">
      {/* Tabs List */}
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="BUY" className="text-sm">BUY</TabsTrigger>
        <TabsTrigger value="SELL" className="text-sm">SELL</TabsTrigger>
        <TabsTrigger value="RENT" className="text-sm">RENT</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      {["BUY", "SELL", "RENT"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <Card className="mx-auto w-full max-w-md">
            <CardContent className="w-full flex flex-col p-2 bg-background text-white gap-3">
              {/* Search Input */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue  placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id={`${tab.toLowerCase()}-search`}
                placeholder="Search"
                className="w-full"
              />

              

              {/* Search Button */}
              <Button className="w-full">Search</Button>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
