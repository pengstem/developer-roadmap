import { useQuery } from '@tanstack/react-query';
import { AITutorLimits } from './AITutorLimits';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { queryClient } from '../../stores/query-client';
import { useIsPaidUser } from '../../queries/billing';

type AITutorHeaderProps = {
  title: string;
  onUpgradeClick: () => void;
  children?: React.ReactNode;
};

export function AITutorHeader(props: AITutorHeaderProps) {
  const { title, onUpgradeClick, children } = props;

  const { data: limits } = useQuery(getAiCourseLimitOptions(), queryClient);
  const { isPaidUser, isLoading: isPaidUserLoading } = useIsPaidUser();

  const { used, limit } = limits ?? { used: 0, limit: 0 };

  return (
    <div className="mb-3 flex min-h-[35px] items-center justify-between max-sm:mb-1">
      <div className="flex items-center gap-2">
        <h2 className="relative flex-shrink-0 top-0 lg:top-1 text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <AITutorLimits
          used={used}
          limit={limit}
          isPaidUser={isPaidUser}
          isPaidUserLoading={isPaidUserLoading}
          onUpgradeClick={onUpgradeClick}
        />

        {children}
      </div>
    </div>
  );
}
