import React, { useState, useRef, useEffect } from 'react';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	PanResponder,
	LayoutRectangle,
	Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createSlideInAnimation } from '../utils/animations';

interface FilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: FilterState) => void;
}

interface FilterState {
	categories: string[];
	sortBy: 'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow';
	brands: string[];
	priceRange: [number, number];
}

const CATEGORIES = ['All Products', 'Shoes', 'Hoodies', 'Accessories', 'Watches'];
const BRANDS = [
	{ name: 'NexusBrand', count: 128 },
	{ name: 'FutureWear', count: 45 },
	{ name: 'UrbanTech', count: 21 },
];
const SORT_OPTIONS = [
	{ id: 'popularity', label: 'Popularity', icon: 'trending-up' as const },
	{ id: 'newest', label: 'Newest Arrivals', icon: 'plus-circle' as const },
	{ id: 'priceLowHigh', label: 'Price: Low to High', icon: 'arrow-up' as const },
	{ id: 'priceHighLow', label: 'Price: High to Low', icon: 'arrow-down' as const },
];

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
	const [selectedCategory, setSelectedCategory] = useState('All Products');
	const [selectedSort, setSelectedSort] = useState<'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow'>('popularity');
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([50, 1200]);

	const MIN_PRICE = 0;
	const MAX_PRICE = 2000;
	const THUMB_SIZE = 20;

	const sliderTrackRef = useRef<LayoutRectangle | null>(null);
	const slideAnimation = useRef(createSlideInAnimation(350)).current;

	// Trigger animation when modal becomes visible
	useEffect(() => {
		if (visible) {
			slideAnimation.slideIn();
		}
	}, [visible, slideAnimation]);

	// Calculate position from price
	const priceToPosition = (price: number): number => {
		if (!sliderTrackRef.current) return 0;
		const trackWidth = sliderTrackRef.current.width;
		const ratio = (price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
		return ratio * trackWidth;
	};

	// Calculate price from position
	const positionToPrice = (position: number): number => {
		if (!sliderTrackRef.current) return MIN_PRICE;
		const trackWidth = sliderTrackRef.current.width;
		const ratio = Math.max(0, Math.min(1, position / trackWidth));
		return Math.round(ratio * (MAX_PRICE - MIN_PRICE) + MIN_PRICE);
	};

	// Min thumb responder
	const minThumbResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, { dx }) => {
				const currentPos = priceToPosition(priceRange[0]);
				const newPos = Math.max(0, currentPos + dx);
				const newPrice = positionToPrice(newPos);
				const maxPrice = priceRange[1];

				if (newPrice <= maxPrice) {
					setPriceRange([newPrice, maxPrice]);
				}
			},
		})
	).current;

	// Max thumb responder
	const maxThumbResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, { dx }) => {
				const currentPos = priceToPosition(priceRange[1]);
				const newPos = Math.min(sliderTrackRef.current?.width || 300, currentPos + dx);
				const newPrice = positionToPrice(newPos);
				const minPrice = priceRange[0];

				if (newPrice >= minPrice) {
					setPriceRange([minPrice, newPrice]);
				}
			},
		})
	).current;

	const toggleBrand = (brand: string) => {
		setSelectedBrands((prev) =>
			prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
		);
	};

	const handleApply = () => {
		onApply({
			categories: [selectedCategory],
			sortBy: selectedSort,
			brands: selectedBrands,
			priceRange,
		});
		onClose();
	};

	const handleReset = () => {
		setSelectedCategory('All Products');
		setSelectedSort('popularity');
		setSelectedBrands([]);
		setPriceRange([50, 1200]);
	};

	return (
		<Modal
			visible={visible}
			animationType="none"
			transparent={true}
			onRequestClose={() => {
				slideAnimation.slideOut(onClose);
			}}
		>
			{/* Backdrop */}
			<View style={styles.backdrop} />
			
			{/* Animated Modal Content */}
			<Animated.View style={[styles.modalContent, slideAnimation.animatedStyle]}>
				<SafeAreaView style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Filter & Sort</Text>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<MaterialCommunityIcons name="close" size={24} color="#fff" />
					</TouchableOpacity>
				</View>

				{/* Scrollable Content */}
				<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
					{/* Categories Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>CATEGORIES</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesScroll}
							contentContainerStyle={styles.categoriesContent}
						>
							{CATEGORIES.map((category) => (
								<TouchableOpacity
									key={category}
									style={[
										styles.categoryChip,
										selectedCategory === category && styles.categoryChipActive,
									]}
									onPress={() => setSelectedCategory(category)}
								>
									<Text
										style={[
											styles.categoryChipText,
											selectedCategory === category && styles.categoryChipTextActive,
										]}
									>
										{category}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Price Range Section */}
					<View style={styles.section}>
						<View style={styles.priceHeader}>
							<Text style={styles.sectionTitle}>PRICE RANGE</Text>
							<Text style={styles.priceValue}>
								${priceRange[0]} - ${priceRange[1]}
							</Text>
						</View>
						<View style={styles.sliderContainer}>
							<View
								style={styles.sliderTrack}
								onLayout={(evt) => {
									sliderTrackRef.current = evt.nativeEvent.layout;
								}}
							>
								{/* Slider background */}
								<View style={styles.sliderBackground} />

								{/* Slider fill (colored range) */}
								<View
									style={[
										styles.sliderFill,
										{
											left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
											right: `${100 - (priceRange[1] / MAX_PRICE) * 100}%`,
										},
									]}
								/>

								{/* Min thumb */}
								<View
									style={[
										styles.sliderThumb,
										{
											left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
											marginLeft: -THUMB_SIZE / 2,
										},
									]}
									{...minThumbResponder.panHandlers}
								>
									<View style={styles.thumbInner} />
								</View>

								{/* Max thumb */}
								<View
									style={[
										styles.sliderThumb,
										{
											left: `${(priceRange[1] / MAX_PRICE) * 100}%`,
											marginLeft: -THUMB_SIZE / 2,
										},
									]}
									{...maxThumbResponder.panHandlers}
								>
									<View style={styles.thumbInner} />
								</View>
							</View>

							{/* Price labels */}
							<View style={styles.sliderLabels}>
								<Text style={styles.sliderLabel}>$0</Text>
								<Text style={styles.sliderLabel}>$500</Text>
								<Text style={styles.sliderLabel}>$1000</Text>
								<Text style={styles.sliderLabel}>$2000</Text>
							</View>
						</View>
					</View>

					{/* Sort By Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>SORT BY</Text>
						<View style={styles.sortOptions}>
							{SORT_OPTIONS.map((option) => (
								<TouchableOpacity
									key={option.id}
									style={[
										styles.sortOption,
										selectedSort === option.id && styles.sortOptionActive,
									]}
									onPress={() =>
										setSelectedSort(
											option.id as 'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow'
										)
									}
								>
									<View style={styles.sortOptionContent}>
										<MaterialCommunityIcons
											name={option.icon}
											size={20}
											color={selectedSort === option.id ? '#2b6cee' : '#9ca3af'}
										/>
										<Text
											style={[
												styles.sortOptionText,
												selectedSort === option.id && styles.sortOptionTextActive,
											]}
										>
											{option.label}
										</Text>
									</View>
									<View
										style={[
											styles.radioButton,
											selectedSort === option.id && styles.radioButtonActive,
										]}
									>
										{selectedSort === option.id && (
											<View style={styles.radioButtonDot} />
										)}
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>

					{/* Brands Section */}
					<View style={[styles.section, styles.lastSection]}>
						<Text style={styles.sectionTitle}>BRANDS</Text>
						<View style={styles.brandList}>
							{BRANDS.map((brand) => (
								<TouchableOpacity
									key={brand.name}
									style={styles.brandItem}
									onPress={() => toggleBrand(brand.name)}
								>
									<View style={styles.brandCheckboxContainer}>
										<View
											style={[
												styles.checkbox,
												selectedBrands.includes(brand.name) && styles.checkboxChecked,
											]}
										>
											{selectedBrands.includes(brand.name) && (
												<MaterialCommunityIcons
													name="check"
													size={14}
													color="#050505"
												/>
											)}
										</View>
										<Text style={styles.brandName}>{brand.name}</Text>
									</View>
									<Text style={styles.brandCount}>{brand.count}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<View style={styles.spacer} />
				</ScrollView>

				{/* Footer with CTA */}
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleReset}>
						<Text style={styles.resetText}>Reset all filters</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.applyButton} onPress={handleApply}>
						<Text style={styles.applyButtonText}>Show 142 Results</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
			</Animated.View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 20,
		paddingBottom: 16,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: '800',
		color: '#fff',
		letterSpacing: -0.5,
	},
	closeButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
	},
	section: {
		marginTop: 24,
		marginBottom: 24,
	},
	lastSection: {
		marginBottom: 40,
	},
	sectionTitle: {
		fontSize: 11,
		fontWeight: '700',
		color: 'rgba(255, 255, 255, 0.5)',
		marginBottom: 12,
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
	categoriesScroll: {
		marginHorizontal: -24,
		paddingHorizontal: 24,
	},
	categoriesContent: {
		gap: 8,
		paddingRight: 24,
	},
	categoryChip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		minHeight: 40,
		justifyContent: 'center',
	},
	categoryChipActive: {
		backgroundColor: 'rgba(43, 173, 238, 0.2)',
		borderColor: 'rgba(43, 173, 238, 0.5)',
	},
	categoryChipText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#fff',
	},
	categoryChipTextActive: {
		color: '#2b6cee',
		fontWeight: '700',
	},
	priceHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 12,
	},
	priceValue: {
		fontSize: 16,
		fontWeight: '700',
		color: '#2b6cee',
	},
	sliderContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	sliderTrack: {
		height: 30,
		marginBottom: 16,
		position: 'relative',
		justifyContent: 'center',
	},
	sliderBackground: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 4,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 2,
		top: '50%',
		marginTop: -2,
	},
	sliderFill: {
		position: 'absolute',
		height: 4,
		backgroundColor: '#2b6cee',
		borderRadius: 2,
		top: '50%',
		marginTop: -2,
	},
	sliderThumb: {
		position: 'absolute',
		width: 20,
		height: 20,
		top: '50%',
		marginTop: -10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	thumbInner: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#050505',
		borderWidth: 2,
		borderColor: '#2b6cee',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.6,
		shadowRadius: 8,
		elevation: 8,
	},
	sliderLabels: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	sliderLabel: {
		fontSize: 11,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.4)',
	},
	sortOptions: {
		gap: 8,
	},
	sortOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	sortOptionActive: {
		backgroundColor: 'rgba(43, 173, 238, 0.15)',
		borderColor: 'rgba(43, 173, 238, 0.4)',
	},
	sortOptionContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	sortOptionText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.7)',
	},
	sortOptionTextActive: {
		color: '#fff',
		fontWeight: '700',
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioButtonActive: {
		borderColor: '#2b6cee',
	},
	radioButtonDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#2b6cee',
	},
	brandList: {
		gap: 8,
	},
	brandItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
	},
	brandCheckboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		flex: 1,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkboxChecked: {
		backgroundColor: '#2b6cee',
		borderColor: '#2b6cee',
	},
	brandName: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
	brandCount: {
		fontSize: 12,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.4)',
	},
	spacer: {
		height: 60,
	},
	footer: {
		paddingHorizontal: 24,
		paddingTop: 8,
		paddingBottom: 20,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, 0.05)',
	},
	resetText: {
		fontSize: 13,
		fontWeight: '700',
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginBottom: 12,
	},
	applyButton: {
		height: 56,
		backgroundColor: '#2b6cee',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.4,
		shadowRadius: 12,
		elevation: 8,
	},
	applyButtonText: {
		fontSize: 16,
		fontWeight: '800',
		color: '#050505',
		letterSpacing: -0.3,
	},
});
