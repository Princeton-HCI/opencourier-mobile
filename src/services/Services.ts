import { client } from './Client';
import commentService, { CommentService } from './commentService';
import orderService, { OrderService } from './orderService';
import userService, { UserService } from './userService';

export type Services = {
  userService: UserService;
  orderService: OrderService;
  commentService: CommentService;
  logout: () => void;
};

const Services = (): Services => {
  const uService = userService(client);
  const oService = orderService(client);
  const cService = commentService(client);

  const logout = () => {
    client.defaults.headers.common.Authorization = undefined;
  };

  return {
    userService: uService,
    orderService: oService,
    commentService: cService,
    logout,
  };
};

export default Services;
