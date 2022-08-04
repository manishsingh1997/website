/**
 * Function to extract a singular name + id from our pathName string.
 * Ex. /app/5QMHiaxMKUi--4wR/orders/12345 => Order #12345
 */
export const getSingularLevelFromPath = (pathname: string, pathToMatch: string) => {
  const matchRegex = new RegExp(`/${pathToMatch}/\\d+`); // we want to look for /orders/12345
  if (pathname.match(matchRegex)) {
    const [id, parentPath] = pathname.split('/').reverse(); // reversing so its easier to iterate 
    const singular = parentPath.slice(0, -1); // removes the 's'
    return `${singular} #${id}`;
  }
  return null;
}
