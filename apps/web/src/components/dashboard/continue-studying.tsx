import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ContinueStudying() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue studying</CardTitle>
        <CardDescription>Year 9 Science</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Biology · 18 cards due
        </p>

        <Button>Study now</Button>
      </CardContent>
    </Card>
  );
}

export default ContinueStudying;