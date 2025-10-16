import { Badge } from "@byte24/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@byte24/ui/components/card";
import { Label } from "@byte24/ui/components/label";
import { Separator } from "@byte24/ui/components/separator";
import Show from "@byte24/ui/components/show";
import dayjs from "dayjs";
import { FullCompany } from "../../types";
import AvatarGroup from "@ui/src/components/avatar-group";

interface CompanyHistoryProps {
  company: FullCompany;
}
export const CompanyHistory = ({ company }: CompanyHistoryProps) => {
  return (
    <Card className="max-h-[500px] min-w-[350px] overflow-auto">
      <CardHeader>
        <CardTitle>Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Separator className="mb-4" />
        {company?.currentStatus?.status?.isCompleted && (
          <div className="flex items-center">
            <Label>KYC status:</Label>
            <Badge
              variant={company?.kycCheck ? "secondary" : "outline"}
              className={`ml-2 h-fit w-fit ${
                company?.kycCheck ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {company?.kycCheck ? "Goedgekeurd" : "Open"}
            </Badge>
          </div>
        )}
        <div className="text-muted-foreground text-sm">
          Aangemaakt door{" "}
          {company?.createdBy && (
            <AvatarGroup
              users={[company?.createdBy]}
              size="sm"
              className="mr-1 inline"
            />
          )}
          <span className="font-semibold text-foreground">
            {company?.createdBy?.firstName} {company?.createdBy?.lastName}
          </span>{" "}
          op{" "}
          <span className="font-semibold text-foreground">
            {dayjs(company?.createdAt).format("DD-MM-YYYY, HH:mm")}
          </span>
        </div>
        <Show when={!!company?.updatedBy}>
          <Show.If>
            <div className="text-muted-foreground text-sm">
              Laatst gewijzigd door{" "}
              {company?.updatedBy && (
                <AvatarGroup
                  users={[company?.updatedBy]}
                  size="sm"
                  className="mr-1 inline"
                />
              )}
              <span className="font-semibold text-foreground">
                {company?.updatedBy?.firstName} {company?.updatedBy?.lastName}
              </span>{" "}
              op{" "}
              <span className="font-semibold text-foreground">
                {dayjs(company?.updatedAt).format("DD-MM-YYYY, HH:mm")}
              </span>
            </div>
          </Show.If>
          <Show.Else>
            <p className="text-muted-foreground text-sm">Nog niet gewijzigd.</p>
          </Show.Else>
        </Show>
      </CardContent>
    </Card>
  );
};
