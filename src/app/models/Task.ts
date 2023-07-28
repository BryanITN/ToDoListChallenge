export interface GetTaskResponse {
  Id:                    number;
  CreatedDate:           Date;
  StatusTaskDescription: string;
  Title:                 string;
  Description:           string;
  UserId:                number;
  StatusTaskId:          number;
}

export interface CreateUpdateTask {
  CreatedDate:  Date|string;
  Title:        string;
  Description:  string;
  UserId:       number;
  StatusTaskId: number;
}
