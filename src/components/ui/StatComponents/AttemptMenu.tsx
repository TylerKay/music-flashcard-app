import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttemptMenuProps {
  attemptIds: number[];
  selectedAttemptId: number;
  onSelectAttemptId: (id: number) => void; // Callback function
}

export const AttemptMenu: React.FC<AttemptMenuProps> = ({ attemptIds, onSelectAttemptId }) => {
  return (
    <Select onValueChange={(value) => onSelectAttemptId(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an attempt" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Attempts</SelectLabel>
          {attemptIds.map((id) => (
            <SelectItem key={id} value={String(id)}>
              Attempt {id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
