import { getSingularLevelFromPath } from '../components/utils';

describe('getSingularLevelFromPath util test', () => {
  it('should return null if no match (parent url)', () => {
    const pathname = '/app/5QMHiaxMKUi--4wR/orders';
    const pathToMatch = 'orders';
    expect(getSingularLevelFromPath(pathname, pathToMatch)).toBe(null);
  });
  it('should return null if no match (diff url)', () => {
    const pathname = '/app/5QMHiaxMKUi--4wR/appointments';
    const pathToMatch = 'orders';
    expect(getSingularLevelFromPath(pathname, pathToMatch)).toBe(null);
  });
  it('should return null if no match (root url)', () => {
    const pathname = '/app/5QMHiaxMKUi--4wR/';
    const pathToMatch = 'orders';
    expect(getSingularLevelFromPath(pathname, pathToMatch)).toBe(null);
  });
  it('should return singular level if match', () => {
    const pathname = '/app/5QMHiaxMKUi--4wR/orders/12345';
    const pathToMatch = 'orders';
    expect(getSingularLevelFromPath(pathname, pathToMatch)).toBe('order #12345');
  });
  it('should return singular level if match', () => {
    const pathname = '/app/5QMHiaxMKUi--4wR/appointments/12345';
    const pathToMatch = 'appointments';
    expect(getSingularLevelFromPath(pathname, pathToMatch)).toBe('appointment #12345');
  });
});
