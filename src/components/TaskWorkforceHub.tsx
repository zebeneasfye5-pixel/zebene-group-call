import React, { useState } from 'react';
import { WorkforceTask, Currency, MemberProfile } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
  Briefcase, 
  CheckCircle2, 
  Coins, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowUpRight, 
  Building2, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface TaskWorkforceHubProps {
  tasks: WorkforceTask[];
  currency: Currency;
  currentMember: MemberProfile;
  onTaskCompleted: (taskId: string, rewardUSD: number) => void;
}

export const TaskWorkforceHub: React.FC<TaskWorkforceHubProps> = ({
  tasks,
  currency,
  currentMember,
  onTaskCompleted
}) => {
  const [selectedTask, setSelectedTask] = useState<WorkforceTask | null>(null);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [taskProofInput, setTaskProofInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  const handleOpenTask = (t: WorkforceTask) => {
    setSelectedTask(t);
    setTaskProofInput(`Verification completed according to standard guidelines by ${currentMember.fullName} (Member #${currentMember.fourDigitCode}). Results recorded.`);
  };

  const handleCompleteTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    setIsSubmittingTask(true);
    setTimeout(() => {
      onTaskCompleted(selectedTask.id, selectedTask.rewardUSD);
      setCompletedTaskIds([...completedTaskIds, selectedTask.id]);
      setIsSubmittingTask(false);
      showToast(`Task completed! $${selectedTask.rewardUSD.toFixed(2)} (${(selectedTask.rewardUSD * 155).toLocaleString()} ETB) credited to your member balance!`);
      setSelectedTask(null);
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-slate-900 p-4 text-xs font-semibold text-emerald-300 shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Briefcase className="h-4 w-4 text-amber-400" />
            <span>Productive Labor & Economic Participation</span>
            <span aria-hidden="true">·</span>
            <span>Earn Real Income</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Global Workforce & Income-Generating Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Perform certified tasks, expand your workforce, and earn honest, reasonable income credited directly to your verified member account with instant bank withdrawal clearance.
          </p>
        </div>

        {/* Member Income Balance Card */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-4 shrink-0 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-amber-400 font-mono uppercase font-bold block">YOUR MEMBER BALANCE:</span>
              <span className="text-xl font-bold text-white font-mono">
                {formatCurrency(currentMember.balanceUSD, currency)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono block">TASKS DONE:</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                {currentMember.tasksCompleted + completedTaskIds.length} Finished
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tasks.map((task) => {
          const isDone = completedTaskIds.includes(task.id);

          return (
            <div
              key={task.id}
              className={`rounded-2xl border bg-slate-900/70 p-6 space-y-4 transition-all flex flex-col justify-between shadow-xl ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {task.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                      {task.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono block">REWARD:</span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">
                      {formatCurrency(task.rewardUSD, currency)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {task.description}
                </p>

                {/* Task Details Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span>~{task.estimatedHours} hrs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-slate-500" />
                    <span>{task.difficulty}</span>
                  </div>
                  <div className="text-right text-amber-400">
                    {task.availablePositions - task.filledPositions} Openings
                  </div>
                </div>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {task.skillsRequired.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-300 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                {isDone ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Task Completed & Reward Credited</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenTask(task)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:from-amber-300 hover:to-amber-500 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Execute Task & Earn {formatCurrency(task.rewardUSD, currency)}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Submission Verification Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Execute Task & Submit Verification</h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompleteTask} className="space-y-4">
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider block">Task Assignment:</span>
                <h4 className="text-sm font-bold text-white">{selectedTask.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{selectedTask.description}</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Guaranteed Payout:</span>
                  <span className="text-emerald-400 font-bold">${selectedTask.rewardUSD.toFixed(2)} USD ({(selectedTask.rewardUSD * 155).toLocaleString()} ETB)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Assigned Member:</span>
                  <span className="text-white">{currentMember.fullName} (Passcode #{currentMember.fourDigitCode})</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deliverable Work Proof / Output Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  value={taskProofInput}
                  onChange={(e) => setTaskProofInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-amber-500 focus:outline-none font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTask}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingTask ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying Quality...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Submit & Collect ${selectedTask.rewardUSD.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
