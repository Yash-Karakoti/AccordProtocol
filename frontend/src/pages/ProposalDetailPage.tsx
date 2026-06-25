import { Link, useParams } from "react-router-dom";
import { useProposal } from "../hooks/useProposal";

export function ProposalDetailPage() {
  const { id: idParam } = useParams();
  const proposalId = idParam ? Number(idParam) : NaN;
  const invalidId = !idParam || Number.isNaN(proposalId);
  const { proposal, loading, error } = useProposal(invalidId ? -1 : proposalId);

  return (
    <div className="space-y-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
        <Link
          to="/app"
          className="font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Dashboard
        </Link>
        <span className="text-zinc-600">›</span>
        <span className="font-semibold text-white whitespace-nowrap">
          Proposal #{idParam ?? ""}
        </span>
      </div>

      {invalidId ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-5 text-sm text-red-200">
          Invalid proposal id.
        </div>
      ) : loading ? (
        <div className="py-16 text-center text-zinc-500">
          Loading proposal details…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-5 text-sm text-red-200">
          {error}
        </div>
      ) : !proposal ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-5 text-sm text-zinc-300">
          Proposal not found.
        </div>
      ) : (
        <section className="space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-zinc-500 font-mono mb-1">
                  Proposal #{proposal.id}
                </p>
                <h1 className="text-2xl font-semibold text-white">
                  Send {proposal.amount} {proposal.token}
                </h1>
              </div>
              <div className="rounded-full bg-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300">
                {proposal.status}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Recipient
                </p>
                <p className="mt-2 text-sm text-zinc-200">{proposal.to}</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Proposed by
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  {proposal.proposer}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Created
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  {proposal.createdAt}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Approvals
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  {proposal.approvals}/{proposal.threshold}
                </p>
              </div>
            </div>

            {proposal.description && (
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
                  Description
                </p>
                <p className="text-sm leading-6 text-zinc-300">
                  {proposal.description}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
import { StatusBadge } from "../components/StatusBadge";
import { useProposal } from "../hooks/useProposal";

export function ProposalDetailPage() {
  const { id } = useParams();
  const proposalId = Number(id);
  const isValidProposalId = Number.isInteger(proposalId) && proposalId > 0;
  const { proposal, loading, error } = useProposal(proposalId);

  if (!isValidProposalId) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-900 bg-zinc-950 p-8">
          <p className="text-sm text-red-400">Invalid proposal identifier.</p>
          <Link to="/app" className="mt-6 inline-flex text-sm text-emerald-300 underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
              Proposal Detail
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Proposal #{proposalId}
            </h1>
          </div>
          <Link
            to="/app"
            className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            Back to dashboard
          </Link>
        </div>

        {loading && (
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8 text-sm text-zinc-400">
            Loading proposal details…
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && proposal && (
          <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500">{proposal.createdAt}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Send {proposal.amount} {proposal.token}
                </h2>
                <p className="mt-2 font-mono text-sm text-zinc-400">
                  Recipient: {proposal.to}
                </p>
              </div>
              <StatusBadge status={proposal.status} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Approvals</p>
                <p className="mt-2 text-lg text-white">
                  {proposal.approvals} of {proposal.threshold}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Deadline</p>
                <p className="mt-2 text-lg text-white">{proposal.deadline}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Description</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {proposal.description || "No description provided."}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Proposer</p>
              <p className="mt-3 font-mono text-sm text-zinc-300">{proposal.proposer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
