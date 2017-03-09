export class SessionFactory {
	static set(key: string, value: any): void {
		try {
			let val = value;
			// parse object to json string
			if (typeof value == 'object') { val = JSON.stringify(value); }
			// push to session storage
			sessionStorage.setItem(key, val);
		} catch (e) { console.log('set session error : ', e); }
	}
	static get(key: string): any {
		var value = sessionStorage.getItem(key);
		// parse json code
		try { value = JSON.parse(value); }
		catch (e) { }
		return value || null;
	}
	static remove(key: string): void { sessionStorage.removeItem(key); }
	static removeAll(): void { sessionStorage.clear(); }

	// Setup authentication
	private static authenticationKey = 'bitcointh.ssd';
	static setAuthentication(token: string): void { this.set(this.authenticationKey, token); }
	static get getAuthentication(): string { return this.get(this.authenticationKey); }
}

