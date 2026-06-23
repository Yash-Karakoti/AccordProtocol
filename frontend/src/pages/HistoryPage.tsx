import { useState } from "react";
import type { Proposal, ProposalStatus } from "../types/accord";
import { ProposalCard } from "../components/ProposalCard";

type Filter = "all" | ProposalStatus;

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "ready", label: "Ready" },
  { key: "executed", label: "Executed" },
  { key: "expired", label: "Expired" },
  { key: "revoked", label: "Revoked" },
];

export function HistoryPage({
  proposals,
  onApprove,
}: {
  proposals: Proposal[];
  onApprove: (id: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<Filter>("all");
  const noop = () => {};

  const filteredProposals =
    activeTab === "all"
      ? proposals
      : proposals.filter((p) => p.status === activeTab);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Proposal History</h2>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`text-xs px-3 py-1 rounded-md capitalize transition-colors ${
                activeTab === tab.key
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {filteredProposals.length === 0 ? (
          <p className="text-zinc-600 text-sm py-8 text-center">
            No {activeTab === "all" ? "" : `${activeTab} `}proposals found
          </p>
        ) : (
          filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              walletAddress={null}
              onApprove={onApprove}
              onExecute={noop}
              onRevoke={noop}
            />
          ))
        )}
      </div>
    </>
  );
}
