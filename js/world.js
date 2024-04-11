class World {
	constructor(graph, roadWith = 100, roadRoundness = 10){
		this.graph = graph;
		this.roadWith = roadWith;
		this.roadRoundness = roadRoundness;

		this.envelopes = [];
		this.roadBoarders = [];

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
	}
}