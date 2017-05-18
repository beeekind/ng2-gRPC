// package: notes
// file: notes_service.proto

import * as notes_service_pb from "./notes_service_pb";
export class NoteService {
  static serviceName = "notes.NoteService";
}
export namespace NoteService {
  export class AddNote {
    static readonly methodName = "AddNote";
    static readonly service = NoteService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = notes_service_pb.AddNoteRequest;
    static readonly responseType = notes_service_pb.Note;
  }
  export class GetNotes {
    static readonly methodName = "GetNotes";
    static readonly service = NoteService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = notes_service_pb.GetNotesRequest;
    static readonly responseType = notes_service_pb.GetNotesResponse;
  }
  export class DeleteNote {
    static readonly methodName = "DeleteNote";
    static readonly service = NoteService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = notes_service_pb.DeleteNoteRequest;
    static readonly responseType = notes_service_pb.Note;
  }
}
