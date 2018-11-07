import { QueryFile, utils } from 'pg-promise';

// generating a recursive SQL tree for dynamic use of camelized names:
export function loadSqlFromDir(dir:string):any {
  return utils.enumSql(dir, { recursive: true }, (file) => {
    return new QueryFile(file, {
      minify: true,
      params: {
        schema: 'public', // replace ${schema~} with "public"
      },
    });
  });
}
