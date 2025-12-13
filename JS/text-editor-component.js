// React-компонент для редактирования цвета шрифта и типа заголовка
const React = require('react');

const TextEditorComponent = ({ initialText = "Пример текста", initialColor = "#0000", initialHeadingType = "p" }) => {
 const [text, setText] = React.useState(initialText);
  const [color, setColor] = React.useState(initialColor);
 const [headingType, setHeadingType] = React.useState(initialHeadingType);

  // Функция для рендеринга текста в зависимости от типа заголовка
  const renderText = () => {
    const commonProps = {
      style: { color: color },
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e) => setText(e.target.innerText),
      dangerouslySetInnerHTML: { __html: text }
    };

    switch (headingType) {
      case 'h1':
        return React.createElement('h1', commonProps);
      case 'h2':
        return React.createElement('h2', commonProps);
      case 'h3':
        return React.createElement('h3', commonProps);
      case 'h4':
        return React.createElement('h4', commonProps);
      case 'h5':
        return React.createElement('h5', commonProps);
      case 'h6':
        return React.createElement('h6', commonProps);
      default:
        return React.createElement('p', commonProps);
    }
 };

  return React.createElement(
    'div',
    { className: 'text-editor-container' },
    React.createElement(
      'div',
      { className: 'text-editor-controls' },
      React.createElement(
        'div',
        { className: 'control-group' },
        React.createElement('label', { htmlFor: 'color-picker' }, 'Цвет текста: '),
        React.createElement('input', {
          type: 'color',
          id: 'color-picker',
          value: color,
          onChange: (e) => setColor(e.target.value),
          className: 'color-picker'
        })
      ),
      React.createElement(
        'div',
        { className: 'control-group' },
        React.createElement('label', { htmlFor: 'heading-type' }, 'Тип заголовка: '),
        React.createElement(
          'select',
          {
            id: 'heading-type',
            value: headingType,
            onChange: (e) => setHeadingType(e.target.value),
            className: 'heading-type-select'
          },
          React.createElement('option', { value: 'p' }, 'Параграф (p)'),
          React.createElement('option', { value: 'h1' }, 'Заголовок 1 (h1)'),
          React.createElement('option', { value: 'h2' }, 'Заголовок 2 (h2)'),
          React.createElement('option', { value: 'h3' }, 'Заголовок 3 (h3)'),
          React.createElement('option', { value: 'h4' }, 'Заголовок 4 (h4)'),
          React.createElement('option', { value: 'h5' }, 'Заголовок 5 (h5)'),
          React.createElement('option', { value: 'h6' }, 'Заголовок 6 (h6)')
        )
      )
    ),
    renderText()
  );
};

module.exports = TextEditorComponent;