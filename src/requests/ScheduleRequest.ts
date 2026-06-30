import { baseUrl } from "@/EnvVariables";
import { api } from "@/lib/api";
import {
  ScheduleResourceApi,
  ScheduleStatus,
  type PageResponse,
  type ScheduleResponse,
} from "@joao.sumi/qdule";

const publicScheduleApi = new ScheduleResourceApi(undefined, baseUrl);
const authenticatedScheduleApi = new ScheduleResourceApi(
  undefined,
  baseUrl,
  api,
);

function normalizeScheduleList(data: PageResponse): ScheduleResponse[] {
  return (data.content ?? []) as ScheduleResponse[];
}

export async function CreateSchedule(
  treatmentId: number,
  clientName: string,
  clientEmail: string,
  clientNumber: string,
  startDateTime: string,
  endDateTime: string,
  status: ScheduleStatus,
) {
  const { data } = await publicScheduleApi.schedulesPost({
    scheduleCreateRequest: {
      treatmentId,
      client: {
        name: clientName,
        email: clientEmail,
        cellPhone: clientNumber,
      },
      startDateTime,
      endDateTime,
      reason: "",
      status,
    },
  });

  return data;
}

export async function GetSchedules(params?: {
  page?: number;
  size?: number;
  start?: string;
  end?: string;
  status?: ScheduleStatus;
}): Promise<ScheduleResponse[]> {
  const { data } = await authenticatedScheduleApi.schedulesGet({
    page: params?.page ?? 1,
    size: params?.size ?? 500,
    start: params?.start,
    end: params?.end,
    status: params?.status,
  });

  return normalizeScheduleList(data);
}

export async function CancelSchedule(
  schedule: Pick<
    ScheduleResponse,
    "id" | "startDateTime" | "endDateTime" | "reason"
  >,
): Promise<ScheduleResponse> {
  if (
    schedule.id === undefined ||
    !schedule.startDateTime ||
    !schedule.endDateTime
  ) {
    throw new Error("Agendamento inválido para cancelamento.");
  }

  const { data } = await authenticatedScheduleApi.schedulesIdPut({
    id: schedule.id,
    scheduleUpdateRequest: {
      startDateTime: schedule.startDateTime,
      endDateTime: schedule.endDateTime,
      reason: schedule.reason ?? "",
      status: ScheduleStatus.Canceled,
    },
  });

  return data;
}
