const K_SIZE = 40;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    left: 399 / 2 + 'px',
    top: 348 / 2 + 'px',
};

const greatPlaceStyleHover = {
    ...greatPlaceStyle,
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};
