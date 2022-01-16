module.exports = {
  tabWidth: 2, // Tab字符的空格宽度
  printWidth: 120, // 换行的宽度
  semi: true, // 分号
  singleQuote: true, // 单引号
  trailingComma: 'es5', // 尾随逗号
  bracketSpacing: true, // 括号间距
  jsxBracketSameLine: false, // jsx括号同一行
  arrowParens: 'avoid', // 箭头函数括号
  requirePragma: false, // 格式化文件添加严格条件(注释)
  proseWrap: 'preserve', // 包裹markdown的文本
  overrides: [
    // 重写配置: 对不同的文件做不同的格式化
    {
      files: '*.{css,sass,scss,less}',
      options: {
        parser: 'css',
        tabWidth: 2,
      },
    },
    {
      files: ['*.json', '.eslintrc', '.tslintrc', '.prettierrc', '.tern-project'],
      options: {
        parser: 'json',
        tabWidth: 2,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.{wxml,axml,xml,html}',
      options: {
        parser: 'xml',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
