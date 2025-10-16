import { Job, JobsOptions, Queue } from 'bullmq';

export interface JobDataMap<T extends string> {
  [key: string]: any; // Generic to allow for any data structure
}

export interface GenericJobQueue<T extends JobDataMap<string>>
  extends Queue<Job<any, any, string>> {
  add<N extends keyof T>(
    jobName: N,
    data: T[N],
    opts?: JobsOptions
  ): Promise<Job<T[N], any, string>>;
}
