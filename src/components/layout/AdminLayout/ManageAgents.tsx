"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useAgentupdateMutation, useAllagentInfoQuery } from "@/redux/features/admin/admin.api";
import type { User } from "@/types/user";
import { toast } from "sonner";

interface IFilter {
  name: string;
  email: string;
}

export default function ManageAgents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingAgentId, setUpdatingAgentId] = useState<string | null>(null);

  // Fetch agents
  const {
    data: agents,
    isLoading: isAgentsLoading,
    refetch,
  } = useAllagentInfoQuery(undefined);

  // Mutation for status update (approve/suspend)
  const [updateAgentStatus, { isLoading: isUpdating }] = useAgentupdateMutation();

  // Filter agents based on search term
  const filteredAgents = agents?.data?.filter(
    (a: IFilter) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle status toggle
  const handleUpdateStatus = async (agentId: string, currentStatus: "ACTIVE" | "BLOCK") => {
    setUpdatingAgentId(agentId);

    const newStatus = currentStatus === "ACTIVE" ? "BLOCK" : "ACTIVE";

    try {
        console.log(agentId,newStatus)
      const res = await updateAgentStatus({ agentId, status: newStatus }).unwrap();
      console.log(res);
      toast.success(`Agent ${agentId} set to ${newStatus}`)
      console.log(`Agent ${agentId} set to ${newStatus}`);
      refetch(); // ✅ refresh instantly
    } catch (err) {
      console.error("Failed to update agent status:", err);
    } finally {
      setUpdatingAgentId(null);
    }
  };

  if (isAgentsLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" />
        <span className="ml-2">Loading agents...</span>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Agents</h2>
        <Input
          placeholder="Search agents..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAgents && filteredAgents.length > 0 ? (
              filteredAgents.map((agent: User) => {
                const isUpdatingThisAgent = isUpdating && updatingAgentId === agent._id;

                return (
                  <TableRow key={agent._id}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          agent.isActive === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {agent.isActive}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {agent.isActive === "ACTIVE" ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isUpdatingThisAgent}
                          onClick={() => handleUpdateStatus(agent._id, agent.isActive)}
                        >
                          {isUpdatingThisAgent ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          {isUpdatingThisAgent ? "Suspending..." : "BLOCK"}
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={isUpdatingThisAgent}
                          onClick={() => handleUpdateStatus(agent._id, agent.isActive)}
                        >
                          {isUpdatingThisAgent ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          {isUpdatingThisAgent ? "Approving..." : "ACTIVE"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No agents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
