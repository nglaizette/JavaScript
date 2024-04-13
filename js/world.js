class 	World {
	constructor(
		graph,
		roadWith = 100,
		roadRoundness = 10,
		buildingWidth = 150,
		buildingMinLength = 150,
		spacing = 50
		) {
			this.graph = graph;
			this.roadWith = roadWith;
			this.roadRoundness = roadRoundness;
			this.buildingWidth = buildingWidth;
			this.buildingMinLength = buildingMinLength;
			this.spacing = spacing;

			this.envelopes = [];
			this.roadBoarders = [];
			this.buildings = [];
			this.trees = [];

			this.generate();
		}

	generate() {
		this.envelopes.length = 0;
		for(const segment of this.graph.segments) {
			this.envelopes.push(
				new Envelope(segment, this.roadWith, this.roadRoundness)
			);
		}

		this.roadBoarders= Polygon.union(this.envelopes.map((envelope) => envelope.polygon));
		this.buildings = this.#generateBuildings();
		this.trees = this.#generateTrees();
	}

	#generateTrees(count = 10) {
		
		// récupéation de tous les points utilisés
		const points = [
			...this.roadBoarders.map( (segment) => [segment.point1, segment.point2]).flat(),
			...this.buildings.map( (building) => building.points).flat(),
		];
 
		const left = Math.min(...points.map((p) => p.x));
		const right = Math.max(...points.map((point) => point.x));
		const top = Math.min(...points.map((point) => point.y));
		const bottom = Math.max(...points.map((point) => point.y));

		// récupéreation de tous les polygones créés
		const illegalPolygons = [
			...this.buildings,
			...this.envelopes.map((envelope) => envelope.polygon)
		];

		const trees = [];
		while (trees.length < count){
			const point = new Point(
				lerp(left, right, Math.random()),
				lerp(bottom, top, Math.random())
			);
			let keep = true;
			for(const polygon of illegalPolygons){
				if(polygon.containsPoint(point)){
					keep = false;
					break;
				}
			}

			if(keep){
				trees.push(point);
			}
		}
		return trees;
	}

	#generateBuildings(){
		const tmpEnvelopes = [];
		for(const segment of this.graph.segments){
			tmpEnvelopes.push(
				new Envelope(
					segment,
					this.roadWith + this.buildingWidth + this.spacing * 2,
					this.roadRoundness
				)
			);
		}

		const guides = Polygon.union(tmpEnvelopes.map((e) => e.polygon));
		
		for(let i = 0; i < guides.length; i++){
			const segment = guides[i];
			if(segment.length() < this.buildingMinLength){
				guides.splice(i, 1);
				i--;
			}
		}

		const supports = [];
		for(let segment of guides){
			const totalLength = segment.length() + this.spacing; // on considère un espace au bout du segment car on considère qu'un batiment est sa longuer + l'espace.
			const buildingCount = Math.floor(
				totalLength / (this.buildingMinLength + this.spacing)
			);
			const buildingLength = totalLength / buildingCount - this.spacing;

			const direction = segment.directionVector();

			let q1 = segment.point1;
			let q2 = add(q1, scale(direction, buildingLength));
			supports.push(new Segment(q1, q2));

			for(let i = 2; i <= buildingCount; i++){
				q1 = add(q2, scale(direction, this.spacing));
				q2 = add(q1, scale(direction, buildingLength));
				supports.push(new Segment(q1, q2));
			}
		}

		const bases = []
		for(const segment of supports){
			bases.push(new Envelope(segment, this.buildingWidth, 1).polygon);
		}

		// suppressions des bases s'intersectant:
		for(let i = 0; i < bases.length - 1; i++){
			for(let j = i + 1; j < bases.length; j++){
				if(bases[i].intersectsPolygon(bases[j])){
					bases.splice(j, 1);
					j--;
				}
			}
		}

		return bases;
	}

	draw(ctx) {
		for (const envelope of this.envelopes){
			envelope.draw(ctx, {fill: "#BBB", stroke: "#BBB", lineWidth: 15});
		}
		for (const segment of this.graph.segments) {
			segment.draw(ctx, { color: "white", width: 4, dash: [10, 10] });
		 }

		for(const segment of this.roadBoarders){
			segment.draw(ctx, {color: "white", width: "4"});
		}

		for(const building of this.buildings){
			building.draw(ctx);
		}

		for(const tree of this.trees){
			tree.draw(ctx);
		}
	}
}