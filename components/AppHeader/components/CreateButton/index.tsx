"use client";

import { Button } from "@/components/ui/button";
import { HouseLine } from "@phosphor-icons/react";

interface Props {
  setIsCreateOpen: (isCreateOpen: boolean) => void;
}

export const CreateButton = ({ setIsCreateOpen }: Props) => {
  return (
    <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
      <HouseLine size={20} weight="bold" />
      <span className="ml-2">Create</span>
    </Button>
  );
};
