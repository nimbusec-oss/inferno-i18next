import i18next from './i18next';

describe('i18next', () => {
	//    _____      _____  .___ _______
	//   /     \    /  _  \ |   |\      \
	//  /  \ /  \  /  /_\  \|   |/   |   \
	// /    Y    \/    |    \   /    |    \
	// \____|__  /\____|__  /___\____|__  /
	//         \/         \/            \/

	test('format value', () => {
		expect(i18next.format('inferno','uppercase')).toBe('INFERNO');
	});

	test('format without value', () => {
		expect(i18next.format()).toBe();
	});
});