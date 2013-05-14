function getCurrentAcceleration() {
    navigator.accelerometer.getCurrentAcceleration(getAccelerationSuccess, getAccelerationError);
}

// getAccelerationSuccess: Get a snapshot of the current acceleration
function getAccelerationSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}

// getAccelerationError: Failed to get the acceleration
function getAccelerationError() {
    alert('onError!');
}