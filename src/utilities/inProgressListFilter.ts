import { Order } from '@app/types/types';
import { OrderStatus } from '@app/types/enums';

/** IDs hidden until the in-progress feed no longer includes them (stale API / slow index). */
const hiddenAfterDeliveryIds = new Set<string>();

/** Call after a successful mark-as-delivered so the row does not reappear on stale refetches. */
export function hideInProgressOrderAfterDelivery(orderId: string): void {
  hiddenAfterDeliveryIds.add(orderId);
}

function pruneHiddenIds(raw: Order[]): void {
  for (const id of [...hiddenAfterDeliveryIds]) {
    if (!raw.some(o => o.id === id)) {
      hiddenAfterDeliveryIds.delete(id);
    }
  }
}

/** In-progress tab should never list completed or canceled deliveries, or IDs we just delivered. */
export function filterInProgressOrdersForDisplay(
  orders: Order[] | undefined,
): Order[] {
  if (!orders?.length) {
    return [];
  }
  pruneHiddenIds(orders);
  return orders.filter(
    o =>
      !hiddenAfterDeliveryIds.has(o.id) &&
      o.status !== OrderStatus.dropped_off &&
      o.status !== OrderStatus.canceled,
  );
}
