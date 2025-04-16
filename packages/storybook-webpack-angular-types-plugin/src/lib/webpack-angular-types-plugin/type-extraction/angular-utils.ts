import { ClassDeclaration, Node } from 'ts-morph';

export interface HostDirectiveDeclaration {
	declaration: ClassDeclaration;
	inputs: string[];
	outputs: string[];
}

export function getHostDirectives(classDeclaration: ClassDeclaration): HostDirectiveDeclaration[] {
	const decorator =
		classDeclaration.getDecorator('Component') || classDeclaration.getDecorator('Directive');
	if (!decorator) {
		return [];
	}

	const args = decorator.getArguments();
	if (!args.length || !Node.isObjectLiteralExpression(args[0])) {
		return [];
	}

	const hostDirectivesProperty = args[0].getProperty('hostDirectives');
	if (!hostDirectivesProperty || !Node.isPropertyAssignment(hostDirectivesProperty)) {
		return [];
	}

	const initializer = hostDirectivesProperty.getInitializer();
	if (!initializer || !Node.isArrayLiteralExpression(initializer)) {
		return [];
	}

	const a = initializer.getElements().forEach((element) => {
		if (Node.isIdentifier(element)) {
			console.log({
				element,
				symbol: element.getSymbol(),
				text: element.getText(),
				declaration: element
					.getSymbol()
					?.getDeclarations()
					.find((node) => {
						if (Node.isImportSpecifier(node)) {
							return node.getSourceFile().getExportDeclaration(element.getText());
						}
						return undefined;
					}),
			});
		}
		return undefined;
	});
	return [];
}
