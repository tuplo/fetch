const config = {
	setupFilesAfterEnv: ['./jest.setup.ts'],
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
};

export default config;
