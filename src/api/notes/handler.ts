import type NotesService from '../../services/inMemory/notes_service';
import type NotesValidation from '../../validation/notes';
import { type Request, type ResponseToolkit, type ResponseObject } from '@hapi/hapi';
import { type NotePayload, type Note } from '../../types/note';
import { RESPONSE_CODE, RESPONSE_STATUS } from '../../const/api';
import { handleHTTPError } from '../../utils/error_handler';

class NotesHandler {
  private readonly _service: NotesService;
  private readonly _validator: NotesValidation;

  constructor (service: NotesService, validator: NotesValidation) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.getNotesHanlder = this.getNotesHanlder.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  public postNoteHandler (request: Request, h: ResponseToolkit): ResponseObject {
    try {
      this._validator.validate(request.payload as NotePayload);
      const noteId = this._service.addNote(request.payload as NotePayload);

      const response: ResponseObject = h.response({
        status: RESPONSE_STATUS.SUCCESS,
        message: 'Note Created Successfully',
        data: {
          noteId
        }
      });
      response.code(RESPONSE_CODE.CREATED);
      return response;
    } catch (error: any) {
      const response: ResponseObject = handleHTTPError(error, h);
      return response;
    }
  }

  public getNotesHanlder () {
    const notes: Note[] = this._service.getNotes();
    return {
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        notes
      }
    };
  }

  public getNoteByIdHandler (request: Request, h: ResponseToolkit): ResponseObject {
    try {
      const { id } = request.params;
      const note: Note = this._service.getNoteById(id);
      const response: ResponseObject = h.response({
        status: RESPONSE_STATUS.SUCCESS,
        data: {
          note
        }
      });
      response.code(RESPONSE_CODE.OK);
      return response;
    } catch (error: any) {
      const response = handleHTTPError(error, h);
      return response;
    }
  }

  public putNoteByIdHandler (request: Request, h: ResponseToolkit): ResponseObject {
    try {
      const { id } = request.params;
      this._validator.validate(request.payload as NotePayload);
      this._service.editNoteById(id as string, request.payload as NotePayload);
      const response: ResponseObject = h.response({
        status: RESPONSE_STATUS.SUCCESS,
        message: 'Update Success'
      });
      response.code(RESPONSE_CODE.OK);
      return response;
    } catch (error: any) {
      const response = handleHTTPError(error, h);
      return response;
    }
  }

  public deleteNoteByIdHandler (request: Request, h: ResponseToolkit): ResponseObject {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id as string);
      const response: ResponseObject = h.response({
        status: RESPONSE_STATUS.SUCCESS,
        message: 'Delete Success'
      });
      response.code(RESPONSE_CODE.OK);
      return response;
    } catch (error: any) {
      const response = handleHTTPError(error, h);
      return response;
    }
  }
}

export default NotesHandler;
