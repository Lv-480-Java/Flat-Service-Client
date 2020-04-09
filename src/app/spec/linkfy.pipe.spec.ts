import { LinkfyPipe } from '../pipes/linkfy.pipe';

let subject: LinkfyPipe = null;

describe('LinkfyPipe', () => {
    beforeEach(() => {
        subject = new LinkfyPipe();
    });

    it('Must work on empty messages', () => {
        const result = subject.transform('', true);

        expect(result).toBe('');
    });

    it('Must not replace with link when piple is disabled', () => {
        let result = subject.transform('www.github.com', false);

        expect(result).toBe('www.github.com');
    });

    it('Must not replace with HTTP link when piple is disabled', () => {
        let result = subject.transform('http://github.com', false);

        expect(result).toBe('http://github.com');
    });

    it('Must not replace with HTTPs link when piple is disabled', () => {
        let result = subject.transform('https://github.com', false);

        expect(result).toBe('https://github.com');
    });

    it('Must not replace with FTP link when piple is disabled', () => {
        let result = subject.transform('ftp://127.0.0.1', false);

        expect(result).toBe('ftp://127.0.0.1');
    });

    it('Must not replace e-mail with mailto link when piple is disabled', () => {
        let result = subject.transform('test@email.com', false);

        expect(result).toBe('test@email.com');
    });

    it('Must replace www.{0} text with link', () => {
        let result = subject.transform('www.github.com', true);

        expect(result).toBe('<a href="http://www.github.com" target="_blank">www.github.com</a>');
    });

    it('Must replace http://{0} text with link', () => {
        let result = subject.transform('http://github.com', true);

        expect(result).toBe('<a href="http://github.com" target="_blank">http://github.com</a>');
    });

    it('Must replace https://{0} text with link', () => {
        let result = subject.transform('https://github.com', true);

        expect(result).toBe('<a href="https://github.com" target="_blank">https://github.com</a>');
    });

    it('Must replace ftp://{0} text with link', () => {
        let result = subject.transform('ftp://127.0.0.1', true);

        expect(result).toBe('<a href="ftp://127.0.0.1" target="_blank">ftp://127.0.0.1</a>');
    });

    it('Must replace e-mail with mailto link', () => {
        let result = subject.transform('test@email.com', true);

        expect(result).toBe('<a href="mailto:test@email.com">test@email.com</a>');
    });
});
