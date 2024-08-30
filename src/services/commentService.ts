import { UClient } from './Client';
import { NewCommentParams, OrderServiceReponse } from './types';
export interface CommentService {
  createComment: (params: NewCommentParams) => Promise<OrderServiceReponse>;
  updateComment: (params: {
    id: string;
    note: string;
  }) => Promise<OrderServiceReponse>;
  deleteComment: (id: string) => Promise<OrderServiceReponse>;
  addReaction: (params: {
    locationNoteId: string;
    reaction: string;
  }) => Promise<any>;
}

const commentService = (client: UClient): CommentService => {
  const createComment = async (
    params: NewCommentParams,
  ): Promise<OrderServiceReponse> => {
    return client.post('location-notes', params);
  };

  const updateComment = async (params: {
    id: string;
    note: string;
  }): Promise<OrderServiceReponse> => {
    const { id, note } = params;
    return client.patch(`location-notes/${id}`, { note });
  };
  const deleteComment = async (id: string): Promise<OrderServiceReponse> => {
    return client.delete(`location-notes/${id}`);
  };

  const addReaction = async (params: {
    locationNoteId: string;
    reaction: string;
  }) => {
    const { locationNoteId, reaction } = params;
    return client.post(`location-notes/${locationNoteId}/react`, { reaction });
  };

  return {
    createComment,
    updateComment,
    deleteComment,
    addReaction,
  };
};

export default commentService;
