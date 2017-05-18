import { Component, OnInit } from '@angular/core';
import { grpc, BrowserHeaders } from "grpc-web-client";
import { NoteService } from "../../_proto/notes_service_pb_service";
import { Note, GetNotesRequest, GetNotesResponse, AddNoteRequest, DeleteNoteRequest } from "../../_proto/notes_service_pb";

const template = require('./home.jade')({});

@Component({
  selector: 'home',
  template: template
})
export class HomeComponent implements OnInit {
  notes: Array<Note> = [];
  host: string = 'http://localhost:9090';
  body: string =  '';
  author: string = '';

  ngOnInit() {
    console.log('App loaded!!');
    this.getNotes()
  }

  getNotes(){
    const request = new GetNotesRequest();

    grpc.invoke(NoteService.GetNotes, {
      host: this.host,
      request: request,

      onMessage: (notes: GetNotesResponse) => {
        this.notes = notes.getNotesList();
        console.log("Successfully queried, ", notes);
      },

      onEnd(code: grpc.Code, message: string, trailers: BrowserHeaders){
        console.log(code, message)
      }
    })
  }

  addNote(){
    if (!this.author || !this.body){
      alert("Please populate the author and body field!");
      return;
    }

    const request = new AddNoteRequest();
    request.setAuthor(this.author);
    request.setBody(this.body);

    grpc.invoke(NoteService.AddNote, {
      host: this.host,
      request: request,

      onMessage: (note: Note) => {
        this.notes.push(note);
        console.log("Successfully added, ", note);
      },

      onEnd(code: grpc.Code, message: string, trailers: BrowserHeaders){
        console.log(code, message, trailers);
      }
    })
  }

  deleteNote(id){
    const request = new DeleteNoteRequest();
    request.setId(id);

    grpc.invoke(NoteService.DeleteNote, {
      host: this.host,
      request: request,

      onMessage: (note: Note) => {
        this.notes = this.notes.filter(n => n.getId() !== note.getId());
        console.log(this.notes.length);
        console.log("Successfully deleted, ", note);
      },

      onEnd(code: grpc.Code, message: string, trailers: BrowserHeaders){
        console.log(code, message, trailers);
      }
    })
  }
}
