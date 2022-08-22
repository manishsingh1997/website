import {useCallback, useEffect, useState} from 'react';

import {HouseType, Order} from '../types';

const useHouseOrders = (orders: Order[], selectedHouse?: HouseType) => {
  const [houseOrders, setHouseOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (selectedHouse?.id) {
      onSelectedHouseChange();
    }
  }, [selectedHouse?.id, orders]);

  const onSelectedHouseChange = useCallback(() => {
    const filteredOrders = orders?.filter((order) => order?.house?.id === selectedHouse?.id);
    setHouseOrders(filteredOrders);
  }, [orders, selectedHouse]);

  return houseOrders;
};

export default useHouseOrders;
